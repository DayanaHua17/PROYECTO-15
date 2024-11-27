from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.db.models import Sum, Q
from datetime import datetime, timedelta
from .models import Cliente, Proveedor, Factura
from .serializers import (
    UserSerializer, LoginSerializer, ClienteSerializer,
    ProveedorSerializer, FacturaSerializer
)

# Obtener el modelo de usuario personalizado
User = get_user_model()

# ViewSet para la autenticación
class AuthViewSet(viewsets.ViewSet):
    # Permisos para cualquier usuario (público)
    permission_classes = [permissions.AllowAny]
    
    # Acción personalizada para el inicio de sesión
    @action(detail=False, methods=['post'])
    def login(self, request):
        # Validar los datos de entrada con el serializador de inicio de sesión
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            try:
                # Buscar al usuario por correo electrónico
                user = User.objects.get(email=email)
                # Verificar la contraseña
                if user.check_password(password):
                    # Generar tokens JWT
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'token': str(refresh.access_token),
                        'user': UserSerializer(user).data
                    })
            except User.DoesNotExist:
                pass
        # Respuesta de error si las credenciales son inválidas
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )

# ViewSet para gestionar clientes
class ClienteViewSet(viewsets.ModelViewSet):
    # Consultar todos los clientes
    queryset = Cliente.objects.all()
    # Serializador para clientes
    serializer_class = ClienteSerializer
    # Permisos para usuarios autenticados
    permission_classes = [permissions.IsAuthenticated]

# ViewSet para gestionar proveedores
class ProveedorViewSet(viewsets.ModelViewSet):
    # Consultar todos los proveedores
    queryset = Proveedor.objects.all()
    # Serializador para proveedores
    serializer_class = ProveedorSerializer
    # Permisos para usuarios autenticados
    permission_classes = [permissions.IsAuthenticated]

# ViewSet para gestionar facturas
class FacturaViewSet(viewsets.ModelViewSet):
    # Serializador para facturas
    serializer_class = FacturaSerializer
    # Permisos para usuarios autenticados
    permission_classes = [permissions.IsAuthenticated]

    # Método para obtener el queryset de facturas
    def get_queryset(self):
        queryset = Factura.objects.all()
        # Filtrar por estado si se proporciona
        estado = self.request.query_params.get('estado', None)
        # Filtrar por tipo si se proporciona
        tipo = self.request.query_params.get('tipo', None)
        
        if estado:
            queryset = queryset.filter(estado=estado)
        if tipo:
            queryset = queryset.filter(tipo=tipo)
            
        return queryset

    # Método para crear una factura asociada al usuario actual
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    # Acción personalizada para obtener datos del dashboard
    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        today = datetime.now().date()
        thirty_days_ago = today - timedelta(days=30)
        
        # Total por cobrar y por pagar
        total_cobrar = Factura.objects.filter(
            tipo='Emitida',
            estado='Pendiente'
        ).aggregate(total=Sum('monto_total'))['total'] or 0

        total_pagar = Factura.objects.filter(
            tipo='Recibida',
            estado='Pendiente'
        ).aggregate(total=Sum('monto_total'))['total'] or 0

        # Facturas vencidas
        vencidas_cobrar = Factura.objects.filter(
            tipo='Emitida',
            estado='Vencida'
        ).aggregate(total=Sum('monto_total'))['total'] or 0

        # Próximos vencimientos (7 días)
        proximos_vencimientos = Factura.objects.filter(
            fecha_vencimiento__range=[today, today + timedelta(days=7)],
            estado='Pendiente'
        ).order_by('fecha_vencimiento')

        return Response({
            'total_por_cobrar': total_cobrar,
            'total_por_pagar': total_pagar,
            'vencidas_por_cobrar': vencidas_cobrar,
            'proximos_vencimientos': FacturaSerializer(
                proximos_vencimientos,
                many=True
            ).data
        })