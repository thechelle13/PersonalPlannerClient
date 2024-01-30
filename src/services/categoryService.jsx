export const getCategories = () => {
    return fetch(`http://localhost:8000/categories/`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        }
      }).then((res) => res.json())
  }


  export const createCategory = (category) => {
    return fetch(`http://localhost:8000/categories/`,
    {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
            body: JSON.stringify(category)
        }).then((res) => res.json())
    }
    
    export const deleteCategory = (categoryId) => {
        return fetch(`http://localhost:8000/categories/${categoryId}/`, 
        {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        })
    }
    
    export const getCategoryById = (categoryId) => {
        return fetch(`http://localhost:8000/categories/${categoryId}/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
      };
      
    export const editCategory = (category) => {
        return fetch(`http://localhost:8000/categories/${category.id}/`, {
          method: "PUT",
          headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        });
      };
      