import React from "react";
import ReactDOM from "react-dom";

//main component containing the input buttons
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"], //array of letters to be used as controls
      lastClicked: "", //last letter that was clicked, to be displayed in the control panel
      volume: 0.5
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }
  componentDidMount() { //add event listener for keyboard keys
    document.addEventListener("keydown", (event) => {
      if (this.state.letters.indexOf(event.key.toUpperCase()) !== -1) {
        document.getElementById(event.key.toUpperCase()).click(); //simulate click on button if matching key was pressed
      }
    });
  }
  handleVolume(event) {
    this.setState({
      volume: (event.target.value/100)
    });
  }
  handleClick(event) {
    this.setState({
      lastClicked: event.target.getAttribute("name")
    });
    let boxElement = document.getElementById(event.target.id);
    boxElement.style.background = "#D8F757"; //momentarily change background color of button to indicate click
    setTimeout(() => {boxElement.style.background = "#7587D9";}, 50); //change color back
    let audioId = "audio" + event.target.id; //get audio ID matching the pressed button
    let currElement = document.getElementById(audioId); //target audio element matching the pressed button
    currElement.volume = this.state.volume; //set audio volume
    currElement.pause();
    currElement.currentTime = 0; //rewind audio back so it plays from the start
    currElement.play();
  }
  render() {
    //object storing links to external sound files
    const audioObj = {
      1: {link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/909%20Extended/38[kb]909-Clap-1.wav.mp3", soundName: "Clap"},
      2: {link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/14[kb]80s-COWBELL1.aif.mp3", soundName: "Cowbell"},
      3: {link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/15[kb]80s-SNARE1.aif.mp3", soundName: "Snare"},
      4: {link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/94[kb]80s-CRASH2.aif.mp3", soundName: "Crash"},
      5: {link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Korg%20KR-55/10[kb]55.hh1.wav.mp3", soundName: "HH-Closed"},
      6: {link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/38[kb]80s-HHOPEN2.aif.mp3", soundName: "HH-Open"},
      7: {link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Korg%20KR-55/3[kb]55.rim1.wav.mp3", soundName: "Rim-Shot"},
      8: {link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Roland%20TD%207/13[kb]HH%20ACOUSTIC_PEDAL_CLOSED.wav.mp3", soundName: "Acoustic"},
      9: {link: "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/909%20Extended/93[kb]909-Ride-D2.wav.mp3", soundName: "Ride"}
    }
    //map buttons to specific sound files in audioObj object
    let buttons = this.state.letters.map((item, index) => {return <div name={audioObj[index+1].soundName} key={item} id={this.state.letters[index]} onClick={this.handleClick} className="drum-pad">
      <audio className="clip" id={"audio" + this.state.letters[index]} src={audioObj[index+1].link}></audio>
      <h1>{item}</h1>
    </div>})
    return(
      <div id="drum-machine" className="mainBox">
        <div id="grid" className="controlGrid">
          {buttons}
        </div>
        <ControlPanel volume={this.state.volume} handleVolume={this.handleVolume} lastSound={this.state.lastClicked}/>
      </div>
    );
  }
}

//functional component for the control panel
function ControlPanel(props) {
  return(
    <div id="display" className="controlPanel">
      <h3>Volume: {Math.round(props.volume*100)}</h3>
      <input onChange={props.handleVolume} list="tickmarks" id="slider" type="range"></input><br />
      <div className="soundContainer"><h1>{props.lastSound}</h1></div>
    </div>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));

export default Main;
