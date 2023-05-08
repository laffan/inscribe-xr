// Copied from https://codesandbox.io/s/e3yc3

import { useCallback, useRef, useEffect, useState } from 'react';
import { Raycaster, Vector3 } from 'three';
import { useXR, Interactive } from '@react-three/xr';
import { useFrame } from '@react-three/fiber';

export function TeleportIndicator(props) {
	return (
		<>
			<pointLight position={[0, 0.5, 0]} args={[0xff00ff, 2, 0.6]} />
			<mesh position={[0, 0.25, 0]}>
				<coneBufferGeometry args={[0.1, 0.5, 6]} attach="geometry" />
				<meshBasicMaterial attach="material" color={0xff00ff} />
			</mesh>
		</>
	);
}

export default function TeleportTravel(props) {
	const {
		centerOnTeleport,
		Indicator = TeleportIndicator,
		useNormal = true,
	} = props;
	const [isHovered, setIsHovered] = useState(false);
  const [isThumbstickForward, setIsThumbstickForward] = useState(false);

	const target = useRef();
	const targetLoc = useRef();
	const ray = useRef(new Raycaster());

	const rayDir = useRef({
		pos: new Vector3(),
		dir: new Vector3(),
	});


	const { controllers, player } = useXR();

useEffect(() => {
		const handleAxesChange = (event) => {
			// Assuming the forward direction is represented by a negative value on the Y-axis (index 1)
			// You can adjust the threshold (e.g., -0.8) to match the desired sensitivity
      console.log( event.axes );
			if (event.axes[1] < -0.8) {
				setIsThumbstickForward(true);
			} else {
				setIsThumbstickForward(false);
			}
		};

		// Add an event listener for the 'axeschange' event to the first controller
		if (controllers.length > 0) {
			const controller = controllers[0].controller;
			controller.addEventListener('axeschange', handleAxesChange);

			return () => {
				controller.removeEventListener('axeschange', handleAxesChange);
			};
		}
	}, [controllers]);

	useFrame(() => {
    
		if (
      isThumbstickForward &&
			isHovered &&
			controllers.length > 0 &&
			ray.current &&
			target.current &&
			targetLoc.current
		) {
			controllers[0].controller.getWorldDirection(rayDir.current.dir);
			controllers[0].controller.getWorldPosition(rayDir.current.pos);
			rayDir.current.dir.multiplyScalar(-1);
			ray.current.set(rayDir.current.pos, rayDir.current.dir);

			const [intersection] = ray.current.intersectObject(target.current);

			if (intersection) {
				if (useNormal) {
					const p = intersection.point;

					targetLoc.current.position.set(0, 0, 0);

					const n = intersection.face.normal.clone();
					n.transformDirection(intersection.object.matrixWorld);

					targetLoc.current.lookAt(n);
					targetLoc.current.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 2);
					targetLoc.current.position.copy(p);
				} else {
					targetLoc.current.position.copy(intersection.point);
				}
			}
		}
	});

	const click = useCallback(() => {
		if (isHovered) {
			player.position.copy(targetLoc.current.position);
			// if (useNormal) {
			// 	player.rotation.copy(targetLoc.current.rotation);
			// }
		}
	}, [centerOnTeleport, isHovered, useNormal]);

	return (
		<>
			{isHovered && (
				<group ref={targetLoc}>
					<Indicator />
				</group>
			)}
			<Interactive
				onSelect={click}
				onHover={() => setIsHovered(true)}
				onBlur={() => setIsHovered(false)}>
				<group ref={target}>{props.children}</group>
			</Interactive>
		</>
	);
}