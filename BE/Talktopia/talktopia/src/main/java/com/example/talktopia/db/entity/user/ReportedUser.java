package com.example.talktopia.db.entity.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.example.talktopia.db.entity.user.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "reported_user")
public class ReportedUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ru_id")
	private long ruId;

	@Column(name = "ru_report_count")
	private long ruReportCount;

	@OneToOne
	@JoinColumn(name = "user_no")
	private User user;
	
	@Builder
	public ReportedUser(long ruId, long ruReportCount, User user) {
		this.ruId = ruId;
		this.ruReportCount = ruReportCount;
		setUserStatus(user);
	}

	public void setUserStatus(User user) {
		this.user = user;
		if (user != null) {
			user.setReportedUser(this);
		}
	}

}
