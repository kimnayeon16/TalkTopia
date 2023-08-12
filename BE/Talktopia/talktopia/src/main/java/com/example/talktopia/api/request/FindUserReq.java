package com.example.talktopia.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindUserReq {

	String search;
	String findType;
}
