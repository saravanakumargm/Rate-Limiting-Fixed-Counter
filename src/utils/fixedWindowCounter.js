export class FixedWindowCounter {
    constructor(limit, windowSizeMs) {
      this.limit = limit;
      this.windowSizeMs = windowSizeMs; 
      this.requestTimestamps = [];      
    }
  
    isAllowed() {
      const now = Date.now();
      const windowStart = now - this.windowSizeMs;
  
      this.requestTimestamps = this.requestTimestamps.filter(
        (ts) => ts >= windowStart
      );
  
      if (this.requestTimestamps.length < this.limit) {
        this.requestTimestamps.push(now);
        return true;
      }
  
      return false;
    }
  }
  
export default FixedWindowCounter;