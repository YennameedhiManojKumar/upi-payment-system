package com.upi.payment.repository;

import com.upi.payment.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySenderUpiOrReceiverUpi(String senderUpi, String receiverUpi);
}
