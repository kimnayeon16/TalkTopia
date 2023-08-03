package com.example.talktopia.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.talktopia.db.entity.friend.Friend;
import com.example.talktopia.db.entity.user.User;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {

	List<Friend> findByUser(User user);

}
