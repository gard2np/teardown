import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Container, Box, Typography, List, ListItem, Link, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', sans-serif;
    overflow: auto; /* 스크롤 가능 */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  body::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, and Opera */
  }
`;

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans KR, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#1E88E5', // 파란색
    },
    secondary: {
      main: '#D32F2F', // 빨간색
    },
    background: {
      default: '#F5F5F5', // 밝은 회색
    },
    text: {
      primary: '#333', // 어두운 회색
      secondary: '#757575', // 중간 회색
    },
  },
});

const CustomAccordion = styled(Accordion)`
  box-shadow: none;
  border: none;
  &:before {
    display: none;
  }
`;

const CustomAccordionSummary = styled(AccordionSummary)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;

const CustomAccordionDetails = styled(AccordionDetails)`
  border-top: none;
  padding: 0;
`;

const NumberedList = styled(List)`
  counter-reset: list;
`;

const NumberedListItem = styled(ListItem)`
  counter-increment: list;
  list-style: none;
  position: relative;
  margin-left: 20px;

  &::before {
    content: counter(list) ". ";
    position: absolute;
    left: -20px;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const CustomBox = styled(Box)`
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 4px;
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const ResponsiveImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: auto;

  @media (min-width: 501px) {
    max-width: 70%;
    height: auto;
    display: block;
    margin: auto;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
`;

const FooterContainer = styled.footer`
  width: 100%;
  text-align: center;
  padding: 35px 0 0 0;
  font-size: 12px;
`;


function App() {
  const [imageSrc, setImageSrc] = useState('/logic2.png');
  const [isSS1, setIsSS1] = useState("안전조치협의서 접수 안내");
  const [isSS2, setIsSS2] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setImageSrc('/logic2.png');
        setIsSS1("안전조치협의서");
        setIsSS2("접수 안내");
      } else {
        setImageSrc('/logic1.png');
        setIsSS1("안전조치협의서 접수 안내");
        setIsSS2("");
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
        <PageContainer>
        <StyledThemeProvider theme={theme}>
          <GlobalStyle />
          <Container>
            <Box
              component="header"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="10vh"
              bgcolor="primary.main"
              color="white"
              mb={1}
              py={1}  /* 위와 아래 여백 추가 */
            >
              <Typography variant="h4" component="h1" align="center">
                {isSS1} <br /> {isSS2}
              </Typography>
            </Box>
            <Box component="main" mt={4}>
              <Box mb={4}>
                <Typography variant="h6" gutterBottom color="primary.main">
                  도시가스배관 안전조치 협의서란?
                </Typography>
                <CustomBox>
                  <Typography variant="body1" color="text.primary">
                    도시가스사업법 시행규칙 제48조의2(건축물 공사에 따른 안전조치 등) 및
                    『건축물관리법 시행령 일부개정령, 대통령령 제34093호』, 『건축물관리법 시행규칙
                    일부개정령, 국토교통부령 제1298호』에 따라 건축물 해체공사 관계자는 도시가스회사로부터
                    안전조치 협의서 발급 후 허가권자에게 제출해야 합니다.
                  </Typography>
                </CustomBox>
              </Box>
              <CustomAccordion>
                <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" color="primary.main">안전조치협의서 제출 방법</Typography>
                </CustomAccordionSummary>
                <CustomAccordionDetails>
                  <Box p={2} bgcolor="background.default">
                    <Typography variant="body1" color="text.secondary">
                      <ResponsiveImage src={imageSrc} alt="logic" />
                    </Typography>
                  </Box>
                </CustomAccordionDetails>
              </CustomAccordion>
              <CustomAccordion>
                <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" color="primary.main">기타 안내사항</Typography>
                </CustomAccordionSummary>
                <CustomAccordionDetails>
                  <Box p={2} bgcolor="background.default">
                    <NumberedList>
                      <NumberedListItem>
                        <Typography variant="body1" color="text.secondary">
                          아래 협의서 양식을 다운로드하여 접수 E-mail 주소로 보내주시기 바랍니다.
                        </Typography>
                      </NumberedListItem>
                      <NumberedListItem>
                        <Typography variant="body1" color="text.secondary">
                          협의서 필수 기입 내용은 협의서 양식을 참고하시기 바랍니다.
                        </Typography>
                      </NumberedListItem>
                      <NumberedListItem>
                        <Typography variant="body1" color="text.secondary">
                          도시가스 시설이 없는 건축물의 경우에도 반드시 접수해 주셔야 합니다.
                        </Typography>
                      </NumberedListItem>
                      <NumberedListItem>
                        <Typography variant="body1" color="text.secondary">
                          접수 후 회신까지 영업일 기준 5일 정도 소요됩니다.
                        </Typography>
                      </NumberedListItem>
                    </NumberedList>
                  </Box>
                </CustomAccordionDetails>
              </CustomAccordion>
              <CustomAccordion>
                <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" color="primary.main">접수 E-mail 주소 및 문의 연락처</Typography>
                </CustomAccordionSummary>
                <CustomAccordionDetails>
                  <Box p={2} bgcolor="background.default">
                    <List>
                      <ListItem>
                        <Typography variant="body1" color="text.secondary">jbsfy@jbcorporation.com</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1" color="text.secondary">
                          협의서 접수 문의 <br/>
                          <Link href="tel:041-530-1984" color="secondary.main">041-530-1984</Link> <br/>
                          <Link href="tel:041-530-1987" color="secondary.main">041-530-1987</Link>
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </CustomAccordionDetails>
              </CustomAccordion>
              <CustomAccordion>
                <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" color="primary.main">협의서 양식 다운로드</Typography>
                </CustomAccordionSummary>
                <CustomAccordionDetails>
                  <Box p={2} bgcolor="background.default">
                    <List>
                      <ListItem>
                        <Link href="https://www.jbcorporation.com/index/download.php?file=sfy_form.docx&target_Dir=./index/file" target="_blank" rel="noopener noreferrer" color="secondary.main">
                          양식 다운로드
                        </Link>
                      </ListItem>
                    </List>
                  </Box>
                </CustomAccordionDetails>
              </CustomAccordion>
              <CustomAccordion>
                <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" color="primary.main">JB 홈페이지</Typography>
                </CustomAccordionSummary>
                <CustomAccordionDetails>
                  <Box p={1} bgcolor="background.default" display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" onClick={() => window.open('https://www.jbcorporation.com/index/service_09.php', '_blank')}>
                    JB 홈페이지 바로가기
                    </Button>
                  </Box>
                </CustomAccordionDetails>
              </CustomAccordion>
            </Box>
          </Container>
        </StyledThemeProvider>
    </PageContainer>
      <FooterContainer>
        <p>Copyright (c) 2024 JB.co.,LTD.  All right Reserved.</p>
      </FooterContainer>
      </MuiThemeProvider>
    
  );
}

export default App;
