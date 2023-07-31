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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fr_user_no", referencedColumnName = "user_no")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fr_friend_no", referencedColumnName = "user_no")
	private User frUser;

	@Builder
	public Friend(long frNo, User user, User frUser) {
		this.frNo = frNo;
		setFriend(user);
		setFriendOf(frUser);
	}

	public void setFriend(User user) {
		this.user = user;
		user.getFriends().add(this);
	}

	public void setFriendOf(User frUser) {
		this.frUser = frUser;
		frUser.getFriendOf().add(this);
	}
}
