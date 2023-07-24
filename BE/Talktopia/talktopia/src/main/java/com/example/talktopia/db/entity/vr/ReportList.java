package com.example.talktopia.db.entity.vr;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "report_list")
public class ReportList {
	@Id
	@GeneratedValue
	private long rl_no;

	@Column(length = 20)
	private String rl_reporter;

	@Column(length = 20)
	private String rl_bully;

	@Column(length = 300)
	private String rl_body;

	@CreatedDate
	private LocalDateTime rl_report_time;

	@ManyToOne
	@JoinColumn(name = "saveVroom_id") // user_id는 User 엔티티의 기본 키를 참조하는 외래 키
	private SaveVRoom saveVRoom;

}
