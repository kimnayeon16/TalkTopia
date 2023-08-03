// package com.example.talktopia.api.controller;
//
// import java.util.List;
//
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
//
// import com.example.talktopia.api.request.RegistPostReq;
// import com.example.talktopia.api.response.PostListRes;
// import com.example.talktopia.api.service.PostService;
// import com.example.talktopia.common.message.Message;
//
// import lombok.RequiredArgsConstructor;
//
// @RestController
// @RequestMapping("/api/v1/ask")
// @RequiredArgsConstructor
// public class PostController {
//
// 	private final PostService postService;
//
//
// 	@GetMapping("/enter/{userId}")
// 	public List<PostListRes> enterPost(@RequestParam("userId")String userId) throws Exception {
// 		// return postService.enterPost(userId);
// 	}
//
// 	@PostMapping("/reigster")
// 	public Message registerPost(@RequestBody RegistPostReq registPostReq) throws Exception {
//
// 		return postService.registerPost(registPostReq);
// 	}
//
// 	@PostMapping("/anwer")
// 	public ResponseEntity<?>
//
// 	@GetMapping("/list/detail/{userId}/{pNo}")
// 	public ResponseEntity<?>
//
// 	@GetMapping("/list/delete/{userId}/{pNo}")
// 	public ResponseEntity<?>
//
// }
