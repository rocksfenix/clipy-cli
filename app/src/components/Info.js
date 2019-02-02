import React from 'react'
import styled from 'styled-components'
import CoverImage from './CoverImage'
import { Container, Row, Col } from 'react-grid-system'
import getCleanTitle from '../util/getCleanTitle'

const InfoBox = styled.div`
  height: 80px;
  padding: 0.5em;
  font-family: 'Open Sans', sans-serif;
`

const Playlist = styled.div`
  font-size: 1.2em;
`

const VideoTitle = styled.div`
  font-size: 2em;
  font-weight: blod;
`

const Info = ({ title, videoInFocus, coverImage }) => {

  const cleanVideoTitle = getCleanTitle(videoInFocus.title) 

  return (
    <InfoBox>
      <Container fluid>
        <Row align='center'>
          <Col xs={2} md={1} center>
            <CoverImage src={coverImage}/>
          </Col>
          <Col xs={10} md={11}>
            <Row xs={12}>
              <VideoTitle>
                { cleanVideoTitle }
              </VideoTitle>
            </Row>
            <Row xs={12}>
              <Playlist>
                { title }
              </Playlist>
            </Row>
          </Col>
        </Row>
      </Container>
    </InfoBox>
  )
}

export default Info
