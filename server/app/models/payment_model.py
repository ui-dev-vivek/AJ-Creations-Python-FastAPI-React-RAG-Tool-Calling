from sqlalchemy import BigInteger, String, ForeignKey, DateTime, Enum as SqlEnum, Numeric, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from datetime import datetime
from enum import Enum


class PaymentMethod(str, Enum):
    razorpay = "razorpay"
    stripe = "stripe"


class PaymentStatus(str, Enum):
    initiated = "initiated"
    success = "success"
    failed = "failed"


class PaymentAttemptStatus(str, Enum):
    initiated = "initiated"
    success = "success"
    failed = "failed"


class TransactionType(str, Enum):
    debit = "debit"
    credit = "credit"


class RefundStatus(str, Enum):
    initiated = "initiated"
    success = "success"
    failed = "failed"


class Payment(Base):
    __tablename__ = "payments"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    payment_method: Mapped[str] = mapped_column(SqlEnum(PaymentMethod), nullable=False)
    amount: Mapped[Numeric] = mapped_column(Numeric(12, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(10), nullable=False, default="INR")
    status: Mapped[str] = mapped_column(SqlEnum(PaymentStatus), nullable=False, default=PaymentStatus.initiated)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    payment_attempts: Mapped[list["PaymentAttempt"]] = relationship("PaymentAttempt", back_populates="payment", cascade="all, delete-orphan")
    transactions: Mapped[list["Transaction"]] = relationship("Transaction", back_populates="payment", cascade="all, delete-orphan")
    refunds: Mapped[list["Refund"]] = relationship("Refund", back_populates="payment", cascade="all, delete-orphan")
    payout_settlements: Mapped[list["PayoutSettlement"]] = relationship("PayoutSettlement", back_populates="payment", cascade="all, delete-orphan")


class PaymentAttempt(Base):
    __tablename__ = "payment_attempts"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    payment_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("payments.id", ondelete="CASCADE"), nullable=False, index=True)
    gateway_reference: Mapped[str | None] = mapped_column(String(255), unique=True, nullable=True)
    status: Mapped[str] = mapped_column(SqlEnum(PaymentAttemptStatus), nullable=False)
    attempted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Many to One
    payment: Mapped["Payment"] = relationship("Payment", back_populates="payment_attempts")


class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    payment_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("payments.id", ondelete="CASCADE"), nullable=False, index=True)
    transaction_type: Mapped[str] = mapped_column(SqlEnum(TransactionType), nullable=False)
    amount: Mapped[Numeric] = mapped_column(Numeric(12, 2), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Many to One
    payment: Mapped["Payment"] = relationship("Payment", back_populates="transactions")


class Refund(Base):
    __tablename__ = "refunds"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    payment_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("payments.id", ondelete="CASCADE"), nullable=False, index=True)
    amount: Mapped[Numeric] = mapped_column(Numeric(12, 2), nullable=False)
    reason: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(SqlEnum(RefundStatus), nullable=False, default=RefundStatus.initiated)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Many to One
    payment: Mapped["Payment"] = relationship("Payment", back_populates="refunds")


class PayoutSettlement(Base):
    __tablename__ = "payout_settlements"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    payment_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("payments.id", ondelete="CASCADE"), nullable=False, index=True)
    settled_amount: Mapped[Numeric] = mapped_column(Numeric(12, 2), nullable=False)
    settled_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Many to One
    payment: Mapped["Payment"] = relationship("Payment", back_populates="payout_settlements")
