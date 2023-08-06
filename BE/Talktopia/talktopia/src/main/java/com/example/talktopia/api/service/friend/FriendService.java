package com.example.talktopia.api.service.friend;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.talktopia.api.request.friend.FriendIdPwReq;
import com.example.talktopia.common.message.Message;
import com.example.talktopia.db.entity.friend.Friend;
import com.example.talktopia.db.entity.user.User;
import com.example.talktopia.db.repository.FriendRepository;
import com.example.talktopia.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class FriendService {

	private final FriendRepository friendRepository;
	private final UserRepository userRepository;

	// 친구 추가
	public Message addFriend(FriendIdPwReq friendIdPwReq) {
		// userId 기준으로 추가
		User user = findUser(friendIdPwReq.getUserId());

		// partId 기준으로 추가
		User friend = findUser(friendIdPwReq.getPartId());

		// userId로 no 찾기
		long userNo = findUser(friendIdPwReq.getUserId()).getUserNo();

		// 중복 체크
		if (isAlreadyFriend(userNo)) {
			throw new RuntimeException("중복된 친구입니다.");
		}

		// 양방향 셋팅
		Friend newFriend = Friend.builder()
			.frFriendNo(friend.getUserNo())
			.user(user)
			.build();

		Friend reverseFriend = Friend.builder()
			.frFriendNo(user.getUserNo())
			.user(friend)
			.build();

		friendRepository.save(newFriend);
		friendRepository.save(reverseFriend);

		return new Message("친구 등록이 완료되었습니다.");
	}

	public Message deleteFriend(FriendIdPwReq friendIdPwReq) {

		User user = findUser(friendIdPwReq.getUserId());
		User friend = findUser(friendIdPwReq.getPartId());

		Friend f1 = friendRepository.findByUser_UserNoAndFrFriendNo(user.getUserNo(), friend.getUserNo());
		Friend f2 = friendRepository.findByUser_UserNoAndFrFriendNo(friend.getUserNo(), user.getUserNo());

		// 친구 엔티티가 null인 경우 또는 이미 삭제된 경우
		if (f1 == null || f2 == null) {
			throw new RuntimeException("친구 삭제에 실패했습니다.");
		}

		// 양방향 관계에서 관계 해제
		user.getFriends().remove(f1);
		friend.getFriends().remove(f2);

		// 친구 엔티티 삭제
		friendRepository.delete(f1);
		friendRepository.delete(f2);

		return new Message("친구를 삭제하였습니다.");
	}

	// 유저 찾기
	public User findUser(String userId) {
		return userRepository.findByUserId(userId)
			.orElseThrow(() -> new RuntimeException("해당 유저가 존재하지 않습니다."));
	}

	// 중복 찾기
	public boolean isAlreadyFriend(long userNo) {
		List<Friend> friends = friendRepository.findByUser_UserNo(userNo);

		for (Friend f : friends) {
			if(f.getUser().getUserNo() == userNo) {
				return true; // 이미 친구
			}
		}
		return false; // 친구가 아님
	}

	// 친구목록 불러오기
	public List<String> getFriends(String userId) {
		User user = findUser(userId);
		List<Friend> arr = friendRepository.findByUser_UserNo(user.getUserNo());
		List<String> res = new ArrayList<>();
		for(Friend f : arr){
			Long tmp= f.getFrFriendNo();
			User user1 = userRepository.findByUserNo(tmp);
			res.add(user1.getUserId());
		}
		return res;
	}
}
