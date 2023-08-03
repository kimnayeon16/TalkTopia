package com.example.talktopia.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.talktopia.db.entity.friend.Friend;

public interface FriendRepository extends JpaRepository<Friend, Long> {
}
