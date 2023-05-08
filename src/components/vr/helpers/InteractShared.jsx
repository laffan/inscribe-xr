import { Interactive, useInteraction } from "@react-three/xr";

const InteractShared = ( props ) => {
  // console.log( props )

  /* Works on Desktop */
  
  // return (
  //   <group
  //     onClick={props.onSelect }
  //     onPointerOver={props.onHover}
  //     onPointerOut={props.onBlur}
  //     onSelectMissed={props.onSelectMissed}
  //   >
  //     {props.children}
  //   </group>
  // );

  /* Works in VR */
  
  return (
    <Interactive
      onSelect={props.onSelect }
      onHover={props.onHover}
      onBlur={props.onBlur}
    >
      {props.children}
    </Interactive>
  );
};

export default InteractShared;
