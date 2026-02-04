from sqlalchemy import BigInteger, String, ForeignKey, DateTime, Enum as SqlEnum, Numeric, func, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from datetime import datetime
from enum import Enum


class OrderStatus(str, Enum):
    pending = "pending"
    paid = "paid"
    shipped = "shipped"
    delivered = "delivered"
    cancelled = "cancelled"


class OrderStatusHistoryStatus(str, Enum):
    pending = "pending"
    paid = "paid"
    shipped = "shipped"
    delivered = "delivered"
    cancelled = "cancelled"


class OrderAddressType(str, Enum):
    shipping = "shipping"
    billing = "billing"


class OrderNoteCreatedBy(str, Enum):
    system = "system"
    admin = "admin"


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    order_number: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    status: Mapped[str] = mapped_column(SqlEnum(OrderStatus), nullable=False, default=OrderStatus.pending)
    total_amount: Mapped[Numeric] = mapped_column(Numeric(12, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(10), nullable=False, default="USD")
    placed_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    items: Mapped[list["OrderItem"]] = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    status_history: Mapped[list["OrderStatusHistory"]] = relationship("OrderStatusHistory", back_populates="order", cascade="all, delete-orphan")
    addresses: Mapped[list["OrderAddress"]] = relationship("OrderAddress", back_populates="order", cascade="all, delete-orphan")
    notes: Mapped[list["OrderNote"]] = relationship("OrderNote", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    product_variant_id: Mapped[int] = mapped_column(Integer, ForeignKey("product_variants.id", ondelete="RESTRICT"), nullable=False, index=True)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    price_at_purchase: Mapped[Numeric] = mapped_column(Numeric(12, 2), nullable=False)

    # Many to One
    order: Mapped["Order"] = relationship("Order", back_populates="items")


class OrderStatusHistory(Base):
    __tablename__ = "order_status_history"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    status: Mapped[str] = mapped_column(SqlEnum(OrderStatusHistoryStatus), nullable=False)
    changed_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    changed_by: Mapped[str] = mapped_column(String(50), nullable=False)  # system / admin

    # Many to One
    order: Mapped["Order"] = relationship("Order", back_populates="status_history")


class OrderAddress(Base):
    __tablename__ = "order_addresses"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    type: Mapped[str] = mapped_column(SqlEnum(OrderAddressType), nullable=False)  # shipping, billing
    address_text: Mapped[str] = mapped_column(Text, nullable=False)

    # Many to One
    order: Mapped["Order"] = relationship("Order", back_populates="addresses")


class OrderNote(Base):
    __tablename__ = "order_notes"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    note: Mapped[str] = mapped_column(Text, nullable=False)
    created_by: Mapped[str] = mapped_column(String(50), nullable=False)  # system / admin
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Many to One
    order: Mapped["Order"] = relationship("Order", back_populates="notes")
