package com.upi.payment.repository;

import com.upi.payment.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUpiId(String upiId);  // ✅ Add this line
}
