const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..'),directory=path.join(root,'shared/answer-audio');
const ffmpeg=process.env.FFMPEG_PATH;if(!ffmpeg)throw Error('Set FFMPEG_PATH to the local ffmpeg executable.');
const files=fs.readdirSync(directory).filter(file=>file.endsWith('.wav'));
let cursor=0,converted=0;
async function run(){while(cursor<files.length){const file=files[cursor++],input=path.join(directory,file),output=input.replace(/\.wav$/,'.mp3');
 if(fs.existsSync(output)&&fs.statSync(output).mtimeMs>=fs.statSync(input).mtimeMs&&fs.statSync(output).size>1000)continue;
 const temporary=output+'.tmp';
 await new Promise((resolve,reject)=>{const child=cp.spawn(ffmpeg,['-nostdin','-v','error','-y','-i',input,'-map_metadata','-1','-c:a','libmp3lame','-b:a','48k','-ar','16000','-ac','1','-threads','1','-f','mp3',temporary],{windowsHide:true,stdio:['ignore','ignore','pipe']});let error='';child.stderr.on('data',data=>error+=data);child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error(file+': '+error)));});fs.renameSync(temporary,output);converted++;
}}
Promise.all(Array.from({length:4},run)).then(()=>{let before=0,after=0;for(const file of files){before+=fs.statSync(path.join(directory,file)).size;after+=fs.statSync(path.join(directory,file.replace(/\.wav$/,'.mp3'))).size;}console.log(JSON.stringify({files:files.length,converted,before,after,reductionPercent:Math.round((1-after/before)*100)}));}).catch(error=>{console.error(error);process.exitCode=1;});
