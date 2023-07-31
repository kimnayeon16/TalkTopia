package com.example.talktopia.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia.db.entity.user.ProfileImg;

public interface ProfileImgRepository extends JpaRepository<ProfileImg, Long> {

	ProfileImg findByImgUrl(String imgUrl);

}
