import React from 'react';
import {Howl, Howler} from 'howler';
import { FlexboxGrid, IconButton, Icon, Slider } from 'rsuite';

function MusicPlayer() {
  /* // Stream with:
    var stream = new Howl({
      src: ["http://192.168.0.35:8080/rest/stream.view?p=frontman212&c=Mopidy-Subidy&u=peguerosdc&id=7c5eb4b1-1efb-4ff9-87d8-874c84d1c252&v=1.9.0"],
      ext: ['mp3'],
      autoplay: true,
      html5: true
  })
  stream.play()
  */

  return (
    <FlexboxGrid align="middle">
      {/* Current song playing */}
      <FlexboxGrid.Item colspan={5}>
        <img src="http://192.168.0.35:8080/rest/getCoverArt.view?u=peguerosdc&p=enc:66726f6e746d616e323132&v=1.9.0&c=myplayer&f=json&id=7c5eb4b1-1efb-4ff9-87d8-874c84d1c252" alt="Cover Art" width="42" height="42"/>
        <b>Name</b> , Artist
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={2}>
        <IconButton icon={<Icon icon="step-backward" />} appearance="link" size="sm" />
        <IconButton icon={<Icon icon="play" />} circle size="sm" />
        <IconButton icon={<Icon icon="step-forward" />} appearance="link" size="sm" />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={11}>
        0:50 <Slider progress defaultValue={50} /> 1:00
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>More controls</FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default MusicPlayer;