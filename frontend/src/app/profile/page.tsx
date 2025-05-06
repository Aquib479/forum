"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const { userDetail } = useProfile();
  console.log(userDetail);
  return (
    <>
      <div className="">
        <div className="flex items-center justify-center space-x-4 p-4">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {userDetail.name}
              </h2>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1 space-x-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12H8m8 0H8m-2 4h12M4 6h16M4 6v12m16-12v12M4 18h16M4 6v12"
                ></path>
              </svg>
              <span>{userDetail.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1 space-x-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0v5m0 0h4m-4 0H8"
                ></path>
              </svg>
              <span>United States</span>
            </div>
          </div>
        </div>

        {/* posts */}
        <div className="p-2 w-full md:w-2/3 mx-auto mt-4">
          <Tabs defaultValue="forums">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="forums">Forums</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="forums">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {userDetail.forums?.map((forum: any) => (
                  <Card key={forum.id} className="cursor-pointer py-4">
                    <CardContent>
                      <h1 className="font-medium text-lg pb-2">
                        {forum.title}
                      </h1>
                      <p className="test-sm">{forum.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="comments">
              <p>Lorem ipsum dolor sit amet.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
