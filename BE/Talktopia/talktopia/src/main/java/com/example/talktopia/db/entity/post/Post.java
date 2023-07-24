package com.example.talktopia.db.entity.post;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.data.annotation.CreatedDate;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Post {

	@Id
	@GeneratedValue
	private long p_no;

	@Column(length = 500)
	private String p_content;

	@CreatedDate
	private LocalDateTime p_create_time;
}
