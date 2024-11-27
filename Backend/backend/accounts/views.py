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

