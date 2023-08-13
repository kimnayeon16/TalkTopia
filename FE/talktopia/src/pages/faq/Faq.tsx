import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, NavigateFunction } from 'react-router-dom';

import { css } from "@emotion/react";

import Nav from '../../nav/Nav';

import style from "./Faq.module.css";

export default function Faq() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const navigate: NavigateFunction = useNavigate();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const guideStyles = css`
      font-family: 'Dovemayo_wild'; color: #012A4A; padding: 10px; font-weight: bold; font-size: 23px; text-align: center; margin-right: 30px
    `;

    const guideStyles1 = css`
    font-family: 'Dovemayo_wild'; color: #012A4A; padding: 10px; font-weight: bold; font-size: 23px; text-align: center; margin-right: 80px
  `;

  const guideStyles2 = css`
    font-family: 'Dovemayo_wild'; color: #012A4A; padding: 10px; font-weight: bold; font-size: 23px; text-align: center; margin-right: 10px
  `;

    const contextStyles = css`
      font-family: 'Dovemayo_wild';
      padding: 10px;
      font-size: 17px;
      margin-top: 5px;
      margin-left: 30px;
    `

    const contentStyles = css`
      font-family: 'Dovemayo_wild';
      color: #4b535a;
      padding: 10px;
      padding-left: 170px;
      padding-bottom: 30px;
      text-align:justify;
      font-size: 17px;
      float: left;
      font-weight: 600;
    `

  return (
    <>
    <div className={`${style.background}`}>
      <Nav/>
      <h2 className={`${style.title}`}>FAQ</h2>
      <div className={`${style.categoryGroup}`}>
        <span className={`${style.category}`} onClick={()=>{navigate('/faq')}}>FAQ</span>
        <span className={`${style.category}`} onClick={()=>{navigate('/counsel')}}>1대1 문의하기</span>
      </div>
      <Accordion className={`${style.accordion}`} style={{ margin: '0 auto' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography sx={{ width: '15%', flexShrink: 0, ...guideStyles}}>
            TalkTopia
          </Typography>
          <Typography sx={{ marginLeft: '30px', color: 'text.secondary' , ...contextStyles}}>talktopia를 어떻게 사용하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign: 'left', marginLeft: '60px', marginRight: '10%', ...contentStyles}}>
            Talktopia에서는 실시간 번역이 되는 글로벌 화상채팅 서비스입니다. 메인페이지에서 마우스를 동물 위로 가져가면 즉시 다양한 국가의 친구들을 만날 수 있습니다.
            그리고 소통이 잘 된 친구와 다시 만나고 싶다면 친구를 추가하고 메인페이지의 방 생성 참여하기를 클릭하면 내가 만났던 친구들을 친구 초대하여 소통할 수 있습니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${style.accordion}`} style={{ margin: '0 auto' }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography sx={{ width: '15%', flexShrink: 0 , ...guideStyles}}>TalkTopia</Typography>
          <Typography sx={{ color: 'text.secondary' , ...contextStyles}}>
            화상채팅 앱에서 글로벌 사용자들과 어떻게 연결되나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign: 'left', marginLeft: '100px', marginRight: '10%', ...contentStyles}}>
          화상채팅 앱은 글로벌 서버 인프라를 통해 전 세계 다양한 지역의 사용자들과 연결됩니다. 지역과 언어에 따라 적절한 서버를 사용하여 원활한 통신이 이루어집니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${style.accordion}`} style={{ margin: '0 auto' }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '15%', flexShrink: 0 , ...guideStyles1}}>
          언어
          </Typography>
          <Typography sx={{ color: 'text.secondary' , ...contextStyles}}>
            Talktopia가 지원하는 언어는 몇 개인가요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography  sx={{textAlign: 'left', marginLeft: '15%', marginRight: '10%', ...contentStyles}}>
          Talktopia는 12가지 언어를 지원합니다. 제공하는 언어는 한국어, 독일어, 러시아어, 스페인어, 영어, 이탈리아어, 인도네시아어, 일본어, 프랑스어, 포르투칼어, 중국어 간체, 중국어 본체, 힌디어 입니다.
감사합니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${style.accordion}`} style={{ margin: '0 auto' }} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '15%', flexShrink: 0 , ...guideStyles}}>화상 채팅</Typography>
          <Typography sx={{ color: 'text.secondary' , ...contextStyles}}>
            화상채팅에 참여하는 사람의 수에 제한이 있나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography  sx={{textAlign: 'left', marginLeft: '15%', marginRight: '10%', ...contentStyles}}>
            화상채팅에 참여하는 인원은 최소 2명부터 최대 6명까지입니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${style.accordion}`} style={{ margin: '0 auto' }} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5bh-content" id="panel5bh-header">
          <Typography sx={{ width: '15%', flexShrink: 0 , ...guideStyles}}>
            화상 채팅
          </Typography>
          <Typography sx={{ color: 'text.secondary' , ...contextStyles}}>어떻게 화상 채팅방을 생성하거나 참여하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography  sx={{textAlign: 'left', marginLeft: '15%', marginRight: '10%', ...contentStyles}}>
          메인 화면에서 새로운 채팅을 시작하거나 직접 화상 채팅방을 생성할 수 있습니다. 그리고 친구가 초대한 채팅에도 참여할 수 있습니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${style.accordion}`} style={{ margin: '0 auto' }} expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6bh-content" id="panel6bh-header">
          <Typography sx={{ width: '15%', flexShrink: 0 , ...guideStyles}}>
            화상 채팅
          </Typography>
          <Typography sx={{ color: 'text.secondary' , ...contextStyles}}>채팅방에서 채팅 기록을 확인할 수 있나요?</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography  sx={{textAlign: 'left', marginLeft: '15%', marginRight: '10%', ...contentStyles}}>
            아니요, 채팅 기록은 확인할 수 없습니다. 그러나 악성 사용자를 대비하여 화상채팅 중에 이루어진 대화 내용을 관리자가 확인할 수 있음을 안내드립니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${style.accordion}`} style={{ margin: '0 auto' }} expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel7bh-content" id="panel7bh-header">
          <Typography sx={{ width: '15%', flexShrink: 0 , ...guideStyles2}}>
          계정 및 설정
          </Typography>
          <Typography sx={{ color: 'text.secondary' , ...contextStyles}}>개인 정보는 어떻게 변경하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography sx={{textAlign: 'left', marginLeft: '15%', marginRight: '10%', ...contentStyles}}>
          오른쪽 상단에 있는 사용자 아이콘을 클릭하고 "내 정보 보기"를 선택합니다. 개인 정보 보호를 위해 비밀번호를 입력한 후 사진, 이름, 비밀번호, 사용 언어를 변경할 수 있습니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${style.accordion}`} style={{ margin: '0 auto' }} expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel8bh-content" id="panel8bh-header">
          <Typography sx={{ width: '15%', flexShrink: 0 , ...guideStyles1}}>
            신고
          </Typography>
          <Typography sx={{ color: 'text.secondary' , ...contextStyles}}>다른 유저가 부적절한 행동을 했을 때 어떻게 해야하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography sx={{textAlign: 'left', marginLeft: '15%', marginRight: '10%', ...contentStyles}}>
          부적절한 행동을 한 유저의 화면 오른쪽 하단에 있는 "신고하기" 버튼을 클릭하세요. 부적절한 행동을 선택한 후 신고가 완료됩니다. 확인 후 적절한 조치를 취하도록 하겠습니다. 감사합니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${style.accordion}`} style={{ margin: '0 auto' }} expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel9bh-content" id="panel9bh-header">
          <Typography sx={{ width: '15%', flexShrink: 0 , ...guideStyles1}}>
           오류
          </Typography>
          <Typography sx={{ color: 'text.secondary' , ...contextStyles}}>화상채팅 중에 비디오 또는 오디오가 동작하지 않을 때는 어떻게 해야 하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography sx={{textAlign: 'left', marginLeft: '15%', marginRight: '10%', ...contentStyles}}>
          먼저, 카메라와 마이크가 올바르게 연결되어 있는지 확인해주세요. 기기의 설정에서 앱에 대한 카메라와 마이크 접근 권한이 허용되어 있는지도 확인해주세요. 문제가 지속될 경우, 기기를 재부팅해보세요.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${style.accordion}`} style={{ margin: '0 auto' }} expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel10bh-content" id="panel10bh-header">
          <Typography sx={{ width: '15%', flexShrink: 0 , ...guideStyles1}}>
          오류
          </Typography>
          <Typography sx={{ color: 'text.secondary' , ...contextStyles}}>상대방의 소리가 들리지 않는데 어떻게 해야 하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography sx={{textAlign: 'left', marginLeft: '15%', marginRight: '10%', ...contentStyles}}>
          먼저 기기를 재시작 해주시기 바랍니다.<br/>
          이후에도 문제가 지속된다면, 1:1 문의를 통해 아래의 질문들에 대한 답변을 보내주시면 오류를 수정하는 데에 큰 도움이 될 것입니다.<br/>
          1. 특정 사용자 또는 모든 사용자에게 발생하는 오류인지에 대한 여부<br/>
          2. 매칭 중 또는 영상통화 중 발생하는 오류인지에 대한 여부<br/>
          3. 단말기 음소거 여부<br/>
          4. 다른 앱에서도 소리 문제가 발생하는지에 대한 여부<br/>
          5. 이어폰/헤드셋 또는 블루투스 이어폰/헤드셋 사용 여부<br/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`${style.accordion}`} style={{ margin: '0 auto' }} expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel101bh-content" id="panel11bh-header">
          <Typography sx={{ width: '15%', flexShrink: 0 , ...guideStyles1}}>
          오류
          </Typography>
          <Typography sx={{ color: 'text.secondary' , ...contextStyles}}>상대방에게 소리 전달이 되지 않는데 어떻게 해야 하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography sx={{textAlign: 'left', marginLeft: '15%', marginRight: '10%', ...contentStyles}}>
          먼저 기기를 재시작 해주시기 바랍니다.<br/>
          이후에도 문제가 지속된다면, 1:1 문의를 통해 아래의 질문들에 대한 답변을 보내주시면 오류를 수정하는 데에 큰 도움이 될 것입니다.<br/>
          1. 마이크가 작동이 되는지에 대한 여부<br/>
          2. 특정한 사용자 또는 모든 사용자와 발생하는 오류인지에 대한 여부<br/>
          3. 이어폰/헤드셋 또는 블루투스 이어폰/헤드셋 사용 여부<br/>
          4. TalkTopia 이용 중 해당 기기로 음악 청취 여부<br/>
          5. 다른 사이트 사용 시에도 같은 오류가 발생하는지에 대한 여부
          </Typography>
        </AccordionDetails>
      </Accordion>
      <img className={`${style.friend11}`} src="/img/fish/fish7.png" alt=""></img>
        <img className={`${style.fish7}`} src="/img/fish/fish2.png" alt=""></img>
        <img className={`${style.fish2}`} src="/img/fish/friend11.png" alt=""></img>
        <img className={`${style.bubble1}`} src="/img/bubble/bubble1.png" alt=""></img>
        <img className={`${style.bubble2}`} src="/img/bubble/bubble2.png" alt=""></img>
        <img className={`${style.bubble3}`} src="/img/bubble/bubble3.png" alt=""></img>
        <img className={`${style.bubble4}`} src="/img/fish/turtle.png" alt=""></img>
        <img className={`${style.bubble5}`} src="/img/bubble/bubble3.png" alt=""></img>
    </div>
    </>
  );
}
