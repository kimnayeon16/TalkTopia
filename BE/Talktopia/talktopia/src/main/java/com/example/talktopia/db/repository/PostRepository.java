package com.example.talktopia.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia.db.entity.post.Post;

public interface PostRepository extends JpaRepository<Post,Long> {
	List<Post> findByUser_UserId(String userId);
}
