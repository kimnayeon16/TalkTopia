package com.example.talktopia.api.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.talktopia.api.request.RegistPostReq;
import com.example.talktopia.api.response.PostListRes;
import com.example.talktopia.common.message.Message;
import com.example.talktopia.db.entity.post.Post;
import com.example.talktopia.db.entity.user.User;
import com.example.talktopia.db.repository.PostRepository;
import com.example.talktopia.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

	private final PostRepository postRepository;

	private final UserRepository userRepository;

	public Message registerPost(RegistPostReq registPostReq) throws Exception {
		User user = userRepository.findByUserId(registPostReq.getUserId()).orElseThrow(() -> new Exception("우자기 앖어"));
		Post operation = registPostReq.toEntity(user);
		postRepository.save(operation);
		return new Message("게시글이 올라왔습니다");
	}

	public List<PostListRes> enterPost(String userId) throws Exception {
		User user = userRepository.findByUserId(userId).orElseThrow(() -> new Exception("우자기 앖어"));
		List<PostListRes> postListResList = showPost(userId);
		return postListResList;
	}

	@Transactional
	public Message deletePost(String userId, long postNo) throws Exception {
		User user = userRepository.findByUserId(userId).orElseThrow(() -> new Exception("우자기 앖어"));
		Post post = postRepository.findByPostNo(postNo).orElseThrow(() -> new Exception("없는 게시글임"));

		if(post.getUser().getUserId().equals(user.getUserId())){
			postRepository.delete(post);
			return new Message("게시글을 지웠습니다");
		}
		else{
			throw new Exception("지울수있는 권한이 존재하지 않습니다");
		}
	}

	private List<PostListRes> showPost(String userId) {
		List<Post> postList = postRepository.findByUser_UserId(userId);
		List<PostListRes> postListResList = new ArrayList<>();
		PostListRes postListRes = new PostListRes();
		log.info(postList.toString());
		for(Post post : postList){
			postListRes.setPostTitle(post.getPostContent());
			postListRes.setPostContent(post.getPostTitle());
			postListRes.setPostNo(post.getPostNo());
			postListResList.add(postListRes);
		}
		return postListResList;
	}
}
