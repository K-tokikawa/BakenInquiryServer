export default function simpleProgress(){
    const simpleProgress = (maxCount: number, progressLength: number, title: string)=>{
        let nowCount = 0;
    
        return  (addCount: number) =>{
            nowCount += addCount;
    
            const per = Math.min( nowCount / maxCount , 1.0 );
            const count = nowCount <= 0 ? 0 : Math.floor(per * progressLength );
    
            process.stdout.write( `${ title }【${
                "■".repeat( count ) + "□".repeat( progressLength - count)
            }】${ Math.floor(per * 100) }%\r` );
            return per >= 1;
        };
    };
    return simpleProgress
}

export function multiProgress(){
    let endLine = 0;
    const multiProgress = ()=>{
    
        const progressMap = new WeakMap();
        const progressBody: any = function (){};
        progressBody.prototype={
            addCount:  function(count: number){ return progressText( count , this )},
            reset:  function() {
                progressText( 0  , this ,true);
                return this;
            },
            del: function() {
                del( 0  , this ,true);
                return this;
            }
        };
    
        const createProgress = ( maxCount: number,progressLength: number , label: string )=>{
            const p = new progressBody();
            progressMap.set( p , {
                maxCount:maxCount,progressLength:progressLength,label:label,
                nowCount:0,line:endLine,
            });
            process.stdout.write( "\n" );
            endLine++;
            return p.reset();
        };
        const del = (addCount: number, progressObj: any,resetFlg = false)=>{
            const p = progressMap.get( progressObj );
            const lineUp = endLine - p.line; // カーソルの移動量
            const nowCount = resetFlg ? (p.nowCount = 0 ) : ( p.nowCount += addCount );
    
            const per = Math.min( nowCount / p.maxCount , 1.0 );
            const dispCount = nowCount <= 0 ? 0 : Math.floor(per * p.progressLength );
    
            process.stdout.write( `\x1b[${ lineUp }F` ); // カーソルUP
            if( resetFlg ) process.stdout.write( "\x1b[2K" ); // 行消去
            // process.stdout.write( `\x1b[${ lineUp }E` ); // カーソルDOWN
            endLine--
            return per >= 1;
        };
        const progressText = (addCount: number, progressObj: any,resetFlg = false)=>{
            const p = progressMap.get( progressObj );
            const lineUp = endLine - p.line; // カーソルの移動量
            const nowCount = resetFlg ? (p.nowCount = 0 ) : ( p.nowCount += addCount );
    
            const per = Math.min( nowCount / p.maxCount , 1.0 );
            const dispCount = nowCount <= 0 ? 0 : Math.floor(per * p.progressLength );
    
            process.stdout.write( `\x1b[${ lineUp }F` ); // カーソルUP
            if( resetFlg ) process.stdout.write( "\x1b[2K" ); // 行消去
            process.stdout.write( `${ p.label }【${
                "■".repeat( dispCount ) + "□".repeat( Math.max(p.progressLength - dispCount,0))
            }】${ Math.floor(per * 100) }%\r` );
            process.stdout.write( `\x1b[${ lineUp }E` ); // カーソルDOWN
            return per >= 1;
        };
    
        return  {
            writeMessage:(message: string) => {
                process.stdout.write( message );process.stdout.write( "\n" );
                endLine ++;
            },
            addProgress:( maxCount: number,progressLength:number , label: string )=>createProgress(maxCount,progressLength , label),
        };
    };
    return multiProgress
}