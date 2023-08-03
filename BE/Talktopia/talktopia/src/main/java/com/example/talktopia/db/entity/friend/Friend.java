package com.example.talktopia.db.entity.friend;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.talktopia.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "friend")
public class Friend {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fr_no")
	private long frNo;

	@Column(name = "fr_friend_no")
	private long frFriendNo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fr_user_no", referencedColumnName = "user_no")
	private User user;


	@Builder
	public Friend(long frNo, long frFriendNo, User user) {
		this.frNo = frNo;
		this.frFriendNo = frFriendNo;
		setFriend(user);
	}

	public void setFriend(User user) {
		if (this.user != null) {
			this.user.getFriends().remove(this);
		}
		this.user = user;
		user.getFriends().add(this);
	}
}
