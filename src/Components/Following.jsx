
import { pinkButton } from "./lib/Styles";


export default function Following() {
  return (
    <div >
      {/* <div role="tablist" className="tabs tabs-bordered  flex-auto">
  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Followers" />
  <div role="tabpanel" className="tab-content p-10">
  <div className="avatar">
  
</div>
  </div>

  


  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Following" checked />
  <div role="tabpanel" className="tab-content p-10">


  </div>

  
</div> */}
  <div className=" h-16 w-80 flex flex-row  mt-2 hover:bg-slate-50 transition ease-in">
      <img
        // onClick={() => navigate(`/profile/${username}`)}
        className="h-12 w-12 rounded-full object-cover object-center flex-initial cursor-pointer"
        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        alt="User profile image"
      />
      
        <div >
         
          <div >
            <h3 className="font-bold ml-6">
              Name
            </h3>
      
            <p className="text-xs font-semibold opacity-60 ml-4">Username</p>
           
           
          </div>
         <button className={pinkButton}> Confirm</button>
          <button> Delete</button>
        </div>
      </div>
     

      
    </div>
   
  );
};


