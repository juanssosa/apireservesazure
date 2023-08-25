//id,dtIni,dtFin,hrIni,hrFin,clRelated, reserveState
class Reserve {
    constructor(id, dtIni,dtFin,hrIni,hrFin,clRelated, reserveState){
        this.id = id;
        this.dtIni = dtIni;
        this.dtFin = dtFin;
        this.hrIni = hrIni;
        this.hrFin = hrFin;
        this.clRelated = clRelated,
        this.reserveState = reserveState;
    }
} 

module.exports = Reserve;