(function () {
   let counter = {
        count : 0,
        increment : function(){
            this.count++;
        },
        decrement : function(){
            this.count--;
        },
        reset : function(){
            this.count = 0;
        },
        show : function(){
            console.log("Current counter value : "+this.count);
        }
   };

   counter.show();
   counter.increment();
   counter.increment();
   counter.increment();
   counter.show();
   counter.decrement();
   counter.show();
   counter.reset();
   counter.show();
})();