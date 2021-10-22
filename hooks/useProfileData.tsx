import { useSession } from "next-auth/react";

// todo use useEffect here and useState

const useProfileData = () => {
  const { data, status } = useSession();

  if (status !== "authenticated") {
    return null;
  }

  if (!data) {
    return null;
  }

  const { profile, user } = data;

  if (profile === undefined && user === undefined) {
    return null;
  }

  let name =
    (user?.name || profile?.nick || "Profile").slice(
      0,
      (user?.name || profile?.nick || "Profile").indexOf(" ")
    ) ||
    user?.name ||
    profile?.nick ||
    undefined;

  if (name === undefined || name === "Profile") {
    console.log(user?.email);

    if (user?.email) {
      name = user.email.slice(0, user.email.indexOf("@") + 1);
    }
  }

  console.log({ name });

  /* 
  if (!profile?.nick && !user?.name && !user?.email) {
    name = "Profile";
  } */

  const email = user?.email || undefined;
  const image =
    user?.image ||
    profile?.image ||
    "https://source.unsplash.com/800x600/?person";
  const id = profile?.id;

  if (!id) {
    return null;
  }

  if (!name) {
    name = "My Profile";
  }

  return { name, email, image, id };
};

export default useProfileData;
