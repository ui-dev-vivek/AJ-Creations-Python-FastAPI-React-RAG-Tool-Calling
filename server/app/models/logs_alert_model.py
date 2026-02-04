from sqlalchemy import BigInteger, String, ForeignKey, DateTime, Boolean, Text, Enum as SqlEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from datetime import datetime
from enum import Enum


class NotificationType(str, Enum):
    order = "order"
    payment = "payment"
    shipment = "shipment"
    promo = "promo"
    system = "system"


class ActivityAction(str, Enum):
    login = "login"
    logout = "logout"
    view_product = "view_product"
    add_to_cart = "add_to_cart"
    remove_from_cart = "remove_from_cart"
    checkout = "checkout"
    place_order = "place_order"
    cancel_order = "cancel_order"
    profile_update = "profile_update"


class AdminActionType(str, Enum):
    create = "create"
    update = "update"
    delete = "delete"
    approve = "approve"
    reject = "reject"
    suspend = "suspend"
    restore = "restore"


class ErrorLogService(str, Enum):
    payment = "payment"
    shipment = "shipment"
    order = "order"
    auth = "auth"
    email = "email"
    sms = "sms"
    system = "system"


class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    type: Mapped[str] = mapped_column(SqlEnum(NotificationType), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class EmailLog(Base):
    __tablename__ = "email_logs"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    subject: Mapped[str] = mapped_column(String(500), nullable=False)
    sent_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class SmsLog(Base):
    __tablename__ = "sms_logs"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    sent_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class PushNotification(Base):
    __tablename__ = "push_notifications"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    sent_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    action: Mapped[str] = mapped_column(SqlEnum(ActivityAction), nullable=False, index=True)
    log_metadata: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)


class AdminAction(Base):
    __tablename__ = "admin_actions"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    admin_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    action: Mapped[str] = mapped_column(SqlEnum(AdminActionType), nullable=False, index=True)
    target_table: Mapped[str] = mapped_column(String(100), nullable=False)
    target_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)


class ErrorLog(Base):
    __tablename__ = "error_logs"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    service: Mapped[str] = mapped_column(SqlEnum(ErrorLogService), nullable=False, index=True)
    error_message: Mapped[str] = mapped_column(Text, nullable=False)
    stack_trace: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)


class AuditTrail(Base):
    __tablename__ = "audit_trails"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    entity: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    entity_id: Mapped[int] = mapped_column(BigInteger, nullable=False, index=True)
    old_data: Mapped[str | None] = mapped_column(Text, nullable=True)
    new_data: Mapped[str | None] = mapped_column(Text, nullable=True)
    changed_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
