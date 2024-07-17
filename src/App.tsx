import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Container, Box, Typography, List, ListItem, Link, TextField, Button, Alert, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', sans-serif;
    overflow: auto; /* 스크롤바 없애기 */
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

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const res = await axios.post('/.netlify/functions/send-email', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error sending email');
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
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
              안전조치협의서<br/> 접수 안내
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
                    (제출 방법에 대한 구체적인 내용)
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
                        다운로드
                      </Link>
                    </ListItem>
                  </List>
                </Box>
              </CustomAccordionDetails>
            </CustomAccordion>
            <CustomAccordion>
              <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" color="primary.main">이메일로 양식 보내기</Typography>
              </CustomAccordionSummary>
              <CustomAccordionDetails>
                <Box p={2} bgcolor="background.default">
                  <List>
                    <ListItem>
                      <Box mt={1} p={2} bgcolor="background.default">
                        <form onSubmit={handleSubmit}>
                          <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                          />
                          <Box mt={2}>
                            <Button variant="contained" color="primary" type="submit">
                              이메일로 파일 보내기
                            </Button>
                          </Box>
                        </form>
                        {message && (
                          <Box mt={4}>
                            <Alert severity="info">{message}</Alert>
                          </Box>
                        )}
                      </Box>
                    </ListItem>
                  </List>
                </Box>
              </CustomAccordionDetails>
            </CustomAccordion>
          </Box>
        </Container>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
