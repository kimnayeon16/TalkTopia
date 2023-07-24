package com.example.talktopia.db.entity.post;

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
public class Comment {

	@Id
	@GeneratedValue
	private long p_no;

	@Column(length = 500)
	private String c_content;

	@CreatedDate
	private String c_create_time;

}
