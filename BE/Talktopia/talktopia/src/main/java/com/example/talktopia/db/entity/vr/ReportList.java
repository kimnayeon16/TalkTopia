package com.example.talktopia.db.entity.vr;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "rl_no")
	private long rlNo;

	@Column(length = 20, name = "rl_reporter")
	private String rlReporter;

	@Column(length = 20, name = "rl_bully")
	private String rlBully;

	@Column(length = 300, name = "rl_body")
	private String rlBody;

	@CreatedDate
	@Column(name = "rl_report_time")
	private LocalDateTime rlReportTime;

	@ManyToOne
	private SaveVRoom saveVRoom;

}
