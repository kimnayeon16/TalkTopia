package com.example.talktopia.db.entity.vr;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.talktopia.db.entity.user.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Participants {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long partId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vroom_id")
	private VRoom vRoom;

	@Builder
	public Participants(long partId, User user, VRoom vRoom) {
		this.partId = partId;
		setvRoom(vRoom);
		setUser(user);
	}

	private void setvRoom(VRoom vRoom) {
		this.vRoom = vRoom;
		if (vRoom != null) {
			vRoom.getParticipantsList().add(this);
		}
	}

	private void setUser(User user) {
		this.user = user;
		if (user != null) {
			user.getParticipantsList().add(this);
		}
	}

}
