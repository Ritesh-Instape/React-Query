import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

const Product = () => {
  async function getdata() {
    let res = await fetch("https://fakestoreapi.com/products");
    let res2 = await res.json();
    return res2;
  }

  async function adddata(obj) {
    let res = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
  }

  const { data, isLoading, isError,refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getdata,
    enabled: false, 
  });

  const mutation = useMutation({
    mutationFn: adddata,
  });

  return (
    <div>
      <button
        onClick={() => {
          mutation.mutate({ name: "morpheus", job: "leader" });
        }}
      >
        Add
      </button>

      <button
        onClick={() => {
         refetch()
        }}
      >
        Getdata
      </button>

      {isLoading && <p>loading...</p>}
      {isError && <p>error</p>}
      {mutation.isPending && <p>product is adding.....</p>}
      {mutation.isSuccess && <p>product added</p>}

      {data &&
        data.map((ele) => {
          return (
            <div key={ele.id}>
              <p>{ele.title}</p>
              <p>{ele.description}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Product;
