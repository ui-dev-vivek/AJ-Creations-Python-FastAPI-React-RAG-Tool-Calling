from sqlalchemy import ForeignKey, DateTime, String, Integer, Enum as SqlEnum, Numeric, BigInteger
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from datetime import datetime
from enum import Enum
import uuid


class CheckoutSessionStatus(str, Enum):
    initiated = "initiated"
    completed = "completed"
    expired = "expired"


class Cart(Base):
    __tablename__ = "carts"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    user_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    session_id: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # One to Many
    items: Mapped[list["CartItem"]] = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")
    checkout_sessions: Mapped[list["CheckoutSession"]] = relationship("CheckoutSession", back_populates="cart", cascade="all, delete-orphan")


class CartItem(Base):
    __tablename__ = "cart_items"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    cart_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("carts.id", ondelete="CASCADE"), nullable=False, index=True)
    product_variant_id: Mapped[int] = mapped_column(Integer, ForeignKey("product_variants.id", ondelete="CASCADE"), nullable=False, index=True)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    price_snapshot: Mapped[Numeric] = mapped_column(Numeric(12, 2), nullable=False)

    # Many to One
    cart: Mapped["Cart"] = relationship("Cart", back_populates="items")


class CheckoutSession(Base):
    __tablename__ = "checkout_sessions"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    cart_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("carts.id", ondelete="CASCADE"), nullable=False, index=True)
    status: Mapped[str] = mapped_column(SqlEnum(CheckoutSessionStatus), default=CheckoutSessionStatus.initiated, nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Many to One
    cart: Mapped["Cart"] = relationship("Cart", back_populates="checkout_sessions")
