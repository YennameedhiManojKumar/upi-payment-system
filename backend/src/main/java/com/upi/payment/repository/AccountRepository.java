package com.upi.payment.repository;

import com.upi.payment.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUpiId(String upiId); // ✅ Add this line

    Optional<Account> findByUpiIdAndPin(String upiId, String pin);
}
