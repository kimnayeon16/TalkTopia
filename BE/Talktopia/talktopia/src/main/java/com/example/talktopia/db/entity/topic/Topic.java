package com.example.talktopia.db.entity.topic;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name="topic")
public class Topic {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="topic_id")
	private long topicId;

	@Column(length = 100, name = "topic_content")
	private String topicConent;

	@Builder
	public Topic(long topicId, String topicConent) {
		this.topicId = topicId;
		this.topicConent = topicConent;
	}
}
