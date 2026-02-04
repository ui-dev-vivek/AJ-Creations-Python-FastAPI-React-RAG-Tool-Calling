from app.core.database import Base
from app.core.config import settings

# Auth Models
from app.models.auth_model import (
    User, UserOTP, Role, Permission, Session, PasswordReset, LoginAuditLog, Profile, Address
)

# Product Models
from app.models.products_model import (
    Categories, ProductCategories, Brand, Products, ProductVariants,
    Attributes, AttributeValues, ProductVariantAttributes,
    ProductImages, ProductVideos, Inventories
)

# Pricing Models
from app.models.pricing_model import (
    Price, Discount, ProductDiscount, Coupon, CouponUsage, TaxRule, ProductTaxMapping
)

# Cart Models
from app.models.cart_model import (
    Cart, CartItem, CheckoutSession
)

# Order Models
from app.models.orders_model import (
    Order, OrderItem, OrderStatusHistory, OrderAddress, OrderNote
)

# Payment Models
from app.models.payment_model import (
    Payment, PaymentAttempt, Transaction, Refund, PayoutSettlement
)

# Shipment Models
from app.models.shipment_model import (
    Carrier, Shipment, ShipmentItem, TrackingEvent, DeliverySlot
)

# Logs and Alerts Models
from app.models.logs_alert_model import (
    Notification, EmailLog, SmsLog, PushNotification, ActivityLog, AdminAction, ErrorLog, AuditTrail
)

# For alembic to track all models
__all__ = [
    # Auth
    'User', 'UserOTP', 'Role', 'Permission', 'Session', 'PasswordReset', 'LoginAuditLog', 'Profile', 'Address',
    # Products
    'Categories', 'ProductCategories', 'Brand', 'Products', 'ProductVariants',
    'Attributes', 'AttributeValues', 'ProductVariantAttributes',
    'ProductImages', 'ProductVideos', 'Inventories',
    # Pricing
    'Price', 'Discount', 'ProductDiscount', 'Coupon', 'CouponUsage', 'TaxRule', 'ProductTaxMapping',
    # Cart
    'Cart', 'CartItem', 'CheckoutSession',
    # Orders
    'Order', 'OrderItem', 'OrderStatusHistory', 'OrderAddress', 'OrderNote',
    # Payments
    'Payment', 'PaymentAttempt', 'Transaction', 'Refund', 'PayoutSettlement',
    # Shipments
    'Carrier', 'Shipment', 'ShipmentItem', 'TrackingEvent', 'DeliverySlot',
    # Logs & Alerts
    'Notification', 'EmailLog', 'SmsLog', 'PushNotification', 'ActivityLog', 'AdminAction', 'ErrorLog', 'AuditTrail',
]

