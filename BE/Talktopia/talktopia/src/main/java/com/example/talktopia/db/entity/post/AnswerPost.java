package com.example.talktopia.db.entity.post;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "answer_post")
public class AnswerPost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "c_no")
	private long cNo;

	@Column(length = 500, name = "c_content")
	private String cContent;

	@CreatedDate
	@Column(name = "c_create_time")
	private String cCreateTime;

	@ManyToOne(fetch = FetchType.LAZY)
	private Post post;

	@Builder
	public AnswerPost(long cNo, String cContent, String cCreateTime, Post post) {
		this.cNo = cNo;
		this.cContent = cContent;
		this.cCreateTime = cCreateTime;
		setAnswerPost(post);
	}

	private void setAnswerPost(Post post) {
		this.post = post;
		post.getAnswerPostList().add(this);
	}

}
