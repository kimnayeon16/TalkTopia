package com.example.talktopia.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.talktopia.db.entity.user.Language;

public interface LanguageRepository extends JpaRepository<Language, Long> {
	Language findByLangName(String langName);
}
