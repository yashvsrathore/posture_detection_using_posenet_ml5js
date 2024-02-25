let posenet;
let live_video;
let dot_points;
let skeleton;

function setup(){
    createCanvas(1800,950);
    live_video= createCapture(VIDEO);
    live_video.hide();


    posenet=ml5.poseNet(live_video,modelLoaded);
    posenet.on('pose',receivedPoses)
}

function receivedPoses(poses){
    console.log(poses);
    if(poses.length > 0){
        dot_points=poses[0].pose;
        lines=poses[0].skeleton;
    }
}

function modelLoaded(){
    console.log("model loaded");
}


function draw(){
    background(15,156,0);
    let b=0,l=0
    image(live_video,590,240,b,l);
    fill(0,255,0);
    if(dot_points){
        for(let i=0;i<dot_points.keypoints.length;i++){
            ellipse(dot_points.keypoints[i].position.x + 590,dot_points.keypoints[i].position.y + 240,20);
        }
        for(let j=0;j<lines.length;j++){
            stroke(0,255,0);
            strokeWeight(10);
            line(lines[j][0].position.x + 590,lines[j][0].position.y + 240,lines[j][1].position.x + 590,lines[j][1].position.y + 240);
        }
        
    }
}