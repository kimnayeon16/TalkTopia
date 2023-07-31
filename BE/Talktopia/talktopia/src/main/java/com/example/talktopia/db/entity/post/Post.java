package com.example.talktopia.db.entity.post;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import com.example.talktopia.db.entity.user.User;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "post")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "p_no")
	private long pNo;

	@Column(length = 500, name = "p_content")
	private String pContent;

	@Column(name = "p_title")
	private String pTitle;

	@CreatedDate
	@Column(name = "p_create_time")
	private LocalDateTime pCreateTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_no")
	private User user;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	private List<AnswerPost> answerPostList = new ArrayList<>();



}
