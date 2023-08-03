// package com.example.talktopia.api.service;
//
// import java.util.List;
//
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Service;
//
// import com.example.talktopia.api.request.RegistPostReq;
// import com.example.talktopia.api.response.PostListRes;
// import com.example.talktopia.common.message.Message;
// import com.example.talktopia.db.entity.post.Post;
// import com.example.talktopia.db.entity.user.User;
// import com.example.talktopia.db.repository.PostRepository;
// import com.example.talktopia.db.repository.UserRepository;
//
// import lombok.RequiredArgsConstructor;
//
// @Service
// @RequiredArgsConstructor
// public class PostService {
//
// 	private final PostRepository postRepository;
//
// 	private final UserRepository userRepository;
//
// 	public Message registerPost(RegistPostReq registPostReq) throws Exception {
// 		User user = userRepository.findByUserId(registPostReq.getUserId()).orElseThrow(() -> new Exception("우자기 앖어"));
//
// 		Post operation = registPostReq.toEntity(user);
//
// 		postRepository.save(operation);
// 		return new Message("게시글이 올라왔습니다");
// 	}
//
// 	public List<PostListRes> enterPost(String userId) throws Exception {
// 		User user = userRepository.findByUserId(userId).orElseThrow(() -> new Exception("우자기 앖어"));
// 		List<Post> postList = postRepository.findByUser_UserId(userId);
// 		return
//
//
// 	}
// }
