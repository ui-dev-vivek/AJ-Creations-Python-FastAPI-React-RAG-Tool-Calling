import decimal
from sqlalchemy import (
    BigInteger, String, ForeignKey, Boolean, DateTime, Integer,
    Enum as SqlEnum, Numeric, Table, Column
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from datetime import datetime
from enum import Enum


class Price(Base):
    __tablename__ = "prices"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    product_variant_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('product_variants.id', ondelete="CASCADE")
    )
    region: Mapped[str | None] = mapped_column(String(225), nullable=True)
    currency: Mapped[str] = mapped_column(String(10), nullable=False)
    price: Mapped[decimal.Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    valid_from: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    valid_to: Mapped[datetime] = mapped_column(DateTime, nullable=False)


class DiscountType(str, Enum):
    percentage = "percentage"
    flat = "flat"

class Discount(Base):
    __tablename__ = "discounts"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(225), nullable=False)
    discount_type: Mapped[str] = mapped_column(SqlEnum(DiscountType), nullable=False)
    discount_value: Mapped[decimal.Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    start_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    end_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # One to Many
    product_discounts: Mapped[list["ProductDiscount"]] = relationship(
        back_populates="discount", cascade="all, delete-orphan"
    )





class ProductDiscount(Base):
    __tablename__ = "product_discounts"

    product_variant_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('product_variants.id', ondelete="CASCADE"),
        primary_key=True
    )
    discount_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey('discounts.id', ondelete="CASCADE"),
        primary_key=True
    )

    # Relationships
    discount: Mapped["Discount"] = relationship(back_populates="product_discounts")

class Coupon(Base):
    __tablename__ = "coupons"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    code: Mapped[str] = mapped_column(String(225), unique=True, nullable=False)
    discount_type: Mapped[str] = mapped_column(SqlEnum(DiscountType), nullable=False)
    discount_value: Mapped[decimal.Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    max_uses: Mapped[int] = mapped_column(Integer, nullable=False)
    max_uses_per_user: Mapped[int] = mapped_column(Integer, nullable=False)
    min_order_amount: Mapped[decimal.Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    start_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    end_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # One to Many
    coupon_usages: Mapped[list["CouponUsage"]] = relationship(
        back_populates="coupon", cascade="all, delete-orphan"
    )


class CouponUsage(Base):
    __tablename__ = "coupon_usages"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    coupon_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey('coupons.id', ondelete="CASCADE"), nullable=False
    )
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey('users.id', ondelete="CASCADE"), nullable=False
    )
    order_id: Mapped[int | None] = mapped_column(
        BigInteger, ForeignKey('orders.id', ondelete="SET NULL"), nullable=True
    )
    used_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Many to One
    coupon: Mapped["Coupon"] = relationship(back_populates="coupon_usages")


class TaxRule(Base):
    __tablename__ = "tax_rules"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    country: Mapped[str] = mapped_column(String(100), nullable=False)
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    tax_percentage: Mapped[decimal.Decimal] = mapped_column(Numeric(5, 2), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # One to Many
    product_tax_mappings: Mapped[list["ProductTaxMapping"]] = relationship(
        back_populates="tax_rule", cascade="all, delete-orphan"
    )


class ProductTaxMapping(Base):
    __tablename__ = "product_tax_mappings"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    product_id: Mapped[int] = mapped_column(
        Integer, ForeignKey('products.id', ondelete="CASCADE"), nullable=False
    )
    tax_rule_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey('tax_rules.id', ondelete="CASCADE"), nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Many to One
    tax_rule: Mapped["TaxRule"] = relationship(back_populates="product_tax_mappings")
