package com.example.talktopia.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.talktopia.db.entity.post.Post;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
	List<Post> findByUser_UserId(String userId);

	Optional<Post> findByPostNo(long postNo);
}
