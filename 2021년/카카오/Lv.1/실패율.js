function solution(N, stages) {
    let answer = [];
    
    const stageSize = stages.length;
    const numOfPeople = Array.from({ length: N + 2 }, () => 0);

    let myStage = Array.from({ length: N + 2 }, () => {});
    myStage = myStage.map((stage, idx) => {
        return {
            stageNum: idx,
            failure: 0,
            acc: 0,
        };
    });

    stages.forEach(stage => {
        numOfPeople[stage] += 1;
    });
    
    const st = Array.from({ length: N + 1 }, (_, idx) => idx + 1);
    st.forEach(stage => {
        const prevAcc = myStage[stage - 1].acc;
        myStage[stage].failure = (stageSize - prevAcc) <= 0 ? 0 : (numOfPeople[stage] / (stageSize - prevAcc));
        myStage[stage].acc = prevAcc + numOfPeople[stage];
    });

    myStage = myStage.filter(item => (item.stageNum >= 1 && item.stageNum <= N));
    myStage = myStage.sort((a, b) => {
        if (a.failure == b.failure) {
            return a.stage - b.stage;
        } else {
            return b.failure - a.failure;
        }
    });
    
    return myStage.map(stage => stage.stageNum);
}
