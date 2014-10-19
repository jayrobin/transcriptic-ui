Transcriptic.Run = function(runData) {
  this.title = runData.title || "My Run";
  this.instructions = [];
};

Transcriptic.Run.prototype = {
  addInstruction: function(instruction) {
    this.instructions.push(instruction);
  },
  encodeInstructions: function(){
    finalObj = {instructions:[]};

    for (var i in this.instructions){
      ins  = this.instructions[i];
      type = ins.instructionType;
      instructionList = []

      instructionList.push({
        op: type,
        groups:[]
      });
      for (var x in instructionList){
          instructionList[x]["groups"].push(ins.encodeAction())
      }
      finalObj["instructions"].push(instructionList)
    }

    return JSON.stringify(finalObj, null, '\t')
  }
};